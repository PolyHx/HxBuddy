use anyhow::Result;
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use rocket::{
    http::hyper::{header::AUTHORIZATION, HeaderMap, HeaderValue},
    serde::{Deserialize, Serialize},
};
use std::str;

const BEARER: &str = "BEARER ";
const JWT_SECRET: &[u8] = b"DO NOT PUSH THIS IN PRODUCTION";

#[derive(Debug, Deserialize, Serialize)]
pub struct Claims {
    iss: String,
    sub: String,
    exp: usize,
    iat: usize,
    name: String,
}

fn jwt_from_header(headers: &HeaderMap<HeaderValue>) -> Result<String> {
    let header = headers.get(AUTHORIZATION).unwrap();
    let auth_header = str::from_utf8(header.as_bytes())?;
    if !auth_header.starts_with(BEARER) {
        // return Err(Error::InvalidAuthHeaderError);
    }
    Ok(auth_header.trim_start_matches(BEARER).to_owned())
}

async fn authorize(headers: HeaderMap<HeaderValue>) -> Result<String> {
    let jwt = jwt_from_header(&headers)?;
    let decoded = decode::<Claims>(
        &jwt,
        &DecodingKey::from_secret(JWT_SECRET),
        &Validation::new(Algorithm::HS512),
    )?;

    Ok(decoded.claims.sub)
}

pub fn create_jwt(uid: String, username: String) -> Result<String> {
    let claims = Claims {
        iss: "".to_string(),
        sub: uid,
        exp: 0,
        iat: 0,
        name: username,
    };
    let header = Header::new(Algorithm::HS512);
    let s = encode(&header, &claims, &EncodingKey::from_secret(JWT_SECRET))?;
    Ok(s)
}
