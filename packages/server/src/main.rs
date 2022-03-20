#[macro_use]
extern crate rocket;

use rocket::routes;
use rocket::serde::json::Json;

mod auth;
use auth::Claims;
mod user;
use user::User;

use crate::auth::create_jwt;

#[post("/login", data = "<user>")]
async fn login(user: Json<User>) -> Json<User> {
    println!("{:#?}", user);
    // user.login();
    // Returns the user for now, but will return a JWT
    // user.new_jtw()
    user
}

#[post("/register", data = "<user>")]
async fn register(user: Json<User>) -> Json<String> {
    println!("{:#?}", user);
    user.register();
    // Returns the user for now, but will return a JWT
    // user.new_jtw()
    create_jwt(user.get_username()).unwrap().into()
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![login, register])
}
