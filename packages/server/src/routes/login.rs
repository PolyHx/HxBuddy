use mongodb::{bson::doc, Client};
use rocket::serde::json::Json;
use rocket::State;

use crate::auth::create_jwt;
use crate::user::User;

#[post("/api/v1/login", data = "<user>")]
pub async fn login(conn: &State<Client>, user: Json<User>) -> Json<String> {
    println!("{:#?}", user);

    let db = conn.database("users");
    let collection = db.collection::<User>("users");
    let filter = doc! { "username": user.get_username() };
    let user2 = collection.find_one(filter, None).await.unwrap().unwrap();

    create_jwt(
        user2.get_id().unwrap().to_string(),
        user.get_username().to_string(),
    )
    .unwrap()
    .into()
}
