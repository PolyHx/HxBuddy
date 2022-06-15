use mongodb::{bson::doc, Client};
use rocket::serde::json::Json;
use rocket::State;

use crate::auth::create_jwt;
use crate::models::User;
use crate::user::UserLogin;

#[post("/api/v1/login", data = "<user_login>", format = "json")]
pub async fn login(conn: &State<Client>, user_login: Json<UserLogin>) -> Json<String> {
    let db = conn.database("users");
    let collection = db.collection::<User>("users");
    let filter = doc! { "username": user_login.get_username().to_string() };
    let user = collection.find_one(filter, None).await.unwrap().unwrap();

    create_jwt(user).unwrap().into()
}
