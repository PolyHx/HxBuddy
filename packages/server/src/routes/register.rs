use mongodb::Client;
use rocket::serde::json::Json;
use rocket::State;

use crate::auth::create_jwt;
use crate::user::User;

#[post("/api/v1/register", data = "<user>")]
pub async fn register(conn: &State<Client>, user: Json<User>) -> Json<String> {
    println!("{:#?}", user);
    user.register();

    let db = conn.database("users");
    let collection = db.collection::<User>("users");
    let insert_result = collection.insert_one(user.0.clone(), None).await.unwrap();

    create_jwt(
        insert_result.inserted_id.to_string(),
        user.get_username().to_string(),
    )
    .unwrap()
    .into()
}
