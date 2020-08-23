const chai = require("chai");
const expect = chai.expect;
const assert = require("assert");
const handler = require("./handler");


describe("handler.js => generateCode", () => {
    describe("event", () => {
        it("throws_TypeError_with_null_SSID", async () => {
            // Arrange
            const event = {
                 body: JSON.stringify({
                    SSID: null,
                    password: "test"
                 })
            };

            try {
                //Act
                await handler.generateCode(event)
            }
            catch (error) {
                // Assert
                expect(error.message).to.equal("wifiSettings.SSID is invalid");
            }
        });

        it("throws_TypeError_with_non_string_SSID", async () => {
            // Arrange
            const event = {
                body: JSON.stringify({
                    SSID: {},
                    password: "test"
                })
            };

            try {
                //Act
                await handler.generateCode(event)
            }
            catch (error) {
                // Assert
                expect(error.message).to.equal("wifiSettings.SSID is invalid");
            }
        });

        it("throws_TypeError_with_null_password", async () => {
            // Arrange
            const event = {
                body: JSON.stringify({
                    SSID: "test",
                    password: null
                })
            };

            try {
                //Act
                await handler.generateCode(event)
            }
            catch (error) {
                // Assert
                expect(error.message).to.equal("wifiSettings.password is invalid");
            }
        });

        it("throws_TypeError_with_non_string_password", async () => {
            // Arrange
            const event = {
                body: JSON.stringify({
                    SSID: "test",
                    password: {}
                })
            };

            try {
                //Act
                await handler.generateCode(event)
            }
            catch (error) {
                // Assert
                expect(error.message).to.equal("wifiSettings.password is invalid");
            }
        });
    });

    describe("return", () => {
        it("returns_expected_url_for_non_encrypted_password", async () => {
            // Arrange
            const event =
            {
                body: JSON.stringify({
                    SSID: "test",
                    password: "test",
                    type: "None",
                    hidden: false
                })
            };

            // Act
            let response = await handler.generateCode(event);

            let expectedResponse = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKsSURBVO3BQW7kQAwEwSxC//9yro88NSBIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKSRI6lS4JJypdEr5J5YlijVKsUYo1ysXLVN6UhJMkPKFyh8qbkvCmYo1SrFGKNcrFhyXhDpUnVLokdCpdEjqVO5Jwh8onFWuUYo1SrFEuhknCSRI6lUmKNUqxRinWKBd/nEqXhDuS0Kn8ZcUapVijFGuUiw9T+SaVLgmdSpeEJ1R+k2KNUqxRijXKxcuS8E1J6FQ+KQm/WbFGKdYoxRrl4iGVvyQJd6j8JcUapVijFGuUi4eS0Km8KQmdyh0qJ0noknCicpKEO1TeVKxRijVKsUa5eFkSOpWTJJyodEn4TZJwh8onFWuUYo1SrFEuXqbSJeFE5SQJJypdEjqVLgmdykkSTlS6JPxPxRqlWKMUa5SLXyYJncodKl0SOpWTJHQqXRKeSMKJyhPFGqVYoxRrlPiDFyWhU+mScKLSJaFT6ZJwovJEEjqVLgknKl0SOpU3FWuUYo1SrFEuXqZyonKHyicl4USlS0Kn8psUa5RijVKsUeIPHkjCN6mcJOFEpUvCHSonSehUuiScqDxRrFGKNUqxRrl4mcqbkvBNKl0STpLwhMqbijVKsUYp1igXH5aEO1TepHJHEk6S0Kl0SThR+aRijVKsUYo1ysUwKidJ6FS6JHQqTyShU/mkYo1SrFGKNcrFcEm4Q+WOJJyodEk4UXmiWKMUa5RijXLxYSp/SRI6lROVkyR0Kl0S3lSsUYo1SrFGuXhZEr4pCScqJ0noVO5IQqfSqZyovKlYoxRrlGKNEn+wxijWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNco/0+cD+CKg5sEAAAAASUVORK5CYII=";

            // Assert
            expect(response.body).to.equal(expectedResponse);
        });
    });

    describe("return", () => {
        it("returns_expected_url_for_encrypted_password", async () => {
            // Arrange
            const event =
            {
                body: JSON.stringify({
                    SSID: "test",
                    password: "test",
                    type: "WEP",
                    hidden: false
                })
            };

            // Act
            let response = await handler.generateCode(event);

            let expectedResponse = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKsSURBVO3BQW7kQAwEwSxC//9yro88NSBIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJPKSRI6lS4JJypdEr5J5YlijVKsUYo1ysXLVN6UhJMkPKFyh8qbkvCmYo1SrFGKNcrFhyXhDpUnVLokdCpdEjqVO5Jwh8onFWuUYo1SrFEuhknCSRI6lUmKNUqxRinWKBd/nEqXhDuS0Kn8ZcUapVijFGuUiw9T+SaVLgmdSpeEJ1R+k2KNUqxRijXKxcuS8E1J6FQ+KQm/WbFGKdYoxRrl4iGVvyQJd6j8JcUapVijFGuUi4eS0Km8KQmdyh0qJ0noknCicpKEO1TeVKxRijVKsUa5eFkSOpWTJJyodEn4TZJwh8onFWuUYo1SrFEuXqbSJeFE5SQJJypdEjqVLgmdykkSTlS6JPxPxRqlWKMUa5SLXyYJncodKl0SOpWTJHQqXRKeSMKJyhPFGqVYoxRrlPiDFyWhU+mScKLSJaFT6ZJwovJEEjqVLgknKl0SOpU3FWuUYo1SrFEuXqZyonKHyicl4USlS0Kn8psUa5RijVKsUeIPHkjCN6mcJOFEpUvCHSonSehUuiScqDxRrFGKNUqxRrl4mcqbkvBNKl0STpLwhMqbijVKsUYp1igXH5aEO1TepHJHEk6S0Kl0SThR+aRijVKsUYo1ysUwKidJ6FS6JHQqTyShU/mkYo1SrFGKNcrFcEm4Q+WOJJyodEk4UXmiWKMUa5RijXLxYSp/SRI6lROVkyR0Kl0S3lSsUYo1SrFGuXhZEr4pCScqJ0noVO5IQqfSqZyovKlYoxRrlGKNEn+wxijWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNco/0+cD+CKg5sEAAAAASUVORK5CYII=";

            // Assert
            expect(response.body).to.equal(expectedResponse);
        });
    });
});