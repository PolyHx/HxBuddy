#[macro_use]
extern crate rocket;

#[macro_use]
extern crate dotenv_codegen;

mod auth;
mod models;
mod routes;
mod user;

use mongodb::{options::ClientOptions, Client};
use routes::{login::login, register::register};

use rocket::http::Method;
use rocket_cors::{AllowedOrigins, CorsOptions};

async fn init_db_client(connection_string: &str) -> mongodb::error::Result<Client> {
    let client_options = ClientOptions::parse(connection_string).await?;
    Client::with_options(client_options)
}

#[launch]
async fn rocket() -> _ {
    let client = init_db_client(dotenv!("MONGO_URI"))
        .await
        .expect("Could not initialize the database client");

    let cors = CorsOptions::default()
        .allowed_origins(AllowedOrigins::all())
        .allowed_methods(
            vec![Method::Get, Method::Post, Method::Patch]
                .into_iter()
                .map(From::from)
                .collect(),
        )
        .allow_credentials(true);

    rocket::build()
        .mount("/", routes![login, register])
        .manage(client)
        .attach(cors.to_cors().unwrap())
}

#[cfg(test)]
mod tests {
    use crate::user::UserLogin;

    use super::*;
    use rocket::http::{ContentType, Status};
    use rocket::local::asynchronous::Client;

    async fn build_client() -> Client {
        // TODO connect to a dummy test db
        let client = init_db_client(dotenv!("MONGO_URI")).await.unwrap();

        let r = rocket::build()
            .mount("/", routes![login, register])
            .manage(client);

        Client::tracked(r).await.expect("valid rocket instance")
    }

    #[rocket::async_test]
    async fn test_register() {
        let client = build_client().await;
        let req = client.post("/api/v1/register");

        let user = UserLogin::new("Bob".to_string(), "1234".to_string());
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
