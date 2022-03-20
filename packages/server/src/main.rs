#[macro_use]
extern crate rocket;

use mongodb::{bson::doc, options::ClientOptions, Client};
use rocket::serde::json::Json;
use rocket::{routes, State};

mod auth;
use auth::{create_jwt, Claims};
mod user;
use user::User;

#[post("/login", data = "<user>")]
async fn login(conn: &State<Client>, user: Json<User>) -> Json<String> {
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

#[post("/register", data = "<user>")]
async fn register(conn: &State<Client>, user: Json<User>) -> Json<String> {
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

async fn init_db_client() -> mongodb::error::Result<Client> {
    let client_options = ClientOptions::parse(
        "mongodb+srv://...",
    )
    .await?;
    Client::with_options(client_options)
}

#[launch]
async fn rocket() -> _ {
    let client = init_db_client().await.unwrap();

    rocket::build()
        .mount("/", routes![login, register])
        .manage(client)
}
