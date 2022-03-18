#[macro_use]
extern crate rocket;

use rocket::routes;
use rocket::serde::json::Json;

mod user;
use user::User;

#[post("/register", data = "<user>")]
async fn index(user: Json<User>) -> Json<User> {
    println!("{:#?}", user);
    user.register();
    // Returns the user for now, but will return a JWT
    // user.new_jtw()
    user
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
