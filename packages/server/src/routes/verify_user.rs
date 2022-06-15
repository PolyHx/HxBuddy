use mongodb::{bson::doc, Client};
use rocket::response::status::Forbidden;
use rocket::serde::json::Json;
use rocket::State;

use crate::auth::{create_jwt, verify_jwt, StaffUser};
use crate::models::User;

#[post("/api/v1/verify_user", data = "<jwt>", format = "json")]
pub async fn verify_user(
    staff: StaffUser,
    jwt: Json<String>,
    conn: &State<Client>,
) -> Result<Json<bool>, Forbidden<String>> {
    // Verify that a staff is making the request
    println!("{:?}", staff);

    // Verify that the jwt in the data is valid
    if let Err(err) = verify_jwt(&jwt) {
        return Err(Forbidden(Some(err))).into();
    }

    unimplemented!();

    // Verify that the user hasn't redeemed the food/price yet
    // let db = conn.database("users");
    // let collection = db.collection::<User>("users");
    // let filter = doc! { "username": user.get_username() };
    // let user2 = collection.find_one(filter, None).await.unwrap().unwrap();
}
