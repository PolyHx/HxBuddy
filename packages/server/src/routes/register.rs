use mongodb::bson::doc;
use mongodb::bson::oid::ObjectId;
use mongodb::Client;
use rocket::serde::json::Json;
use rocket::State;

use crate::auth::create_jwt;
use crate::models::User;
use crate::user::UserLogin;

/// Create a new user document in the database
#[post("/api/v1/register", data = "<user>", format = "json")]
pub async fn register(conn: &State<Client>, user: Json<UserLogin>) -> Result<Json<String>, String> {
    // Should only fail if the cost is invalid
    let hash = bcrypt::hash(user.get_password(), bcrypt::DEFAULT_COST).unwrap();
    let mut user = User::new(user.get_username().to_string(), hash);

    let db = conn.database("users");
    let collection = db.collection::<User>("users");

    // TODO make a single query to the database
    // Check if the username is not already taken
    let filter = doc! {"username": user.get_username().to_string()};
    if let Ok(Some(_existing_user)) = collection.find_one(filter, None).await {
        return Err("User already exists".to_string());
    }

    // Insert username and hash to the database
    let insert_result = collection.insert_one(user.clone(), None).await.unwrap();

    let id = ObjectId::parse_str(insert_result.inserted_id.to_string()).unwrap();
    user.set_id(Some(id));
    let jwt = create_jwt(user).unwrap();
    Ok(jwt.into())
}
