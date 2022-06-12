#[macro_use]
extern crate rocket;

#[macro_use]
extern crate dotenv_codegen;

mod auth;
mod routes;
mod user;

use mongodb::{options::ClientOptions, Client};
use routes::{login::login, register::register};

async fn init_db_client() -> mongodb::error::Result<Client> {
    let client_options = ClientOptions::parse(dotenv!("MONGO_URI")).await?;
    Client::with_options(client_options)
}

#[launch]
async fn rocket() -> _ {
    let client = init_db_client().await.unwrap();

    rocket::build()
        .mount("/", routes![login, register])
        .manage(client)
}

#[cfg(test)]
mod tests {
    use crate::user::User;

    use super::*;
    use rocket::http::{ContentType, Status};
    use rocket::local::asynchronous::Client;

    async fn build_client() -> Client {
        // TODO connect to a dummy test db
        let client = init_db_client().await.unwrap();

        let r = rocket::build()
            .mount("/", routes![login, register])
            .manage(client);

        Client::tracked(r).await.expect("valid rocket instance")
    }

    #[rocket::async_test]
    async fn test_register() {
        let client = build_client().await;
        let req = client.post("/api/v1/register");

        let user = User::new("Bob".to_string(), "1234".to_string());
        let req = req.json(&user);

        let response = req.dispatch().await;
        assert_eq!(response.status(), Status::Ok);
        assert_eq!(response.content_type(), Some(ContentType::JSON));
        assert_eq!(
            response
                .into_string()
                .await
                .unwrap()
                .chars()
                .filter(|&c| c == '.')
                .count(),
            2
        );
    }
}
