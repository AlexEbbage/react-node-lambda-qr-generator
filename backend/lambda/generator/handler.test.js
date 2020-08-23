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
        it("returns_expected_url", async () => {
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

            let expectedResponse = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAToSURBVO3BQW4kSRIEQdNA/f/Lujz6KYBEerGHCxPBH6laclK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC365CUgv0nNBGRSMwGZ1ExA3lDzBpBJzQTkN6l546Rq0UnVopOqRZ8sU7MJyBNAJjU3aiYgm4BMat5QswnIppOqRSdVi06qFn3yZUCeUPOGmhsgk5on1NwAmdTcqHkDyBNqvumkatFJ1aKTqkWf/HFqJiA3aiYgk5oJyARkUnMDZFLz/+ykatFJ1aKTqkWf/HFAbtRMQCY1E5BJzQTkRs0NkBs1f9lJ1aKTqkUnVYs++TI136TmCTVPAJnUPAFkUrNJzX/JSdWik6pFJ1WLPlkG5DcBmdRMQCY1E5BJzQTkBsik5gkgk5obIP9lJ1WLTqoWnVQt+uQlNf+Smhs1N2reUPNNav6Sk6pFJ1WLTqoWffISkEnNDZDfpOYJIDdAbtQ8oWYCMqm5ATKpmYA8oeaNk6pFJ1WLTqoW4Y98EZA31ExAbtRMQCY1E5BJzQRkUnMDZFIzAXlDzQ2QJ9RsOqladFK16KRq0SfLgNyomYDcAHlDzQRkUvOb1DwB5AbIpOYJIJOaN06qFp1ULTqpWoQ/8kVAnlDzBpA31ExAbtS8AeQNNROQSc0EZFKz6aRq0UnVopOqRfgjLwCZ1NwAmdRMQG7UPAFkUjMBeULNBGRSMwGZ1NwAeULNE0AmNZtOqhadVC06qVr0yS9TMwG5UXMDZJOaJ9Q8AeRGzQRkUvOGmgnIpOaNk6pFJ1WLTqoW4Y8sAnKj5gbIjZoJyKRmAnKj5gbIE2pugExqJiCTmgnIG2omIJOaN06qFp1ULTqpWvTJl6mZgDyh5kbNG0CeUDMBuQEyqZmATGqeUPMEkG86qVp0UrXopGoR/sgLQCY1E5AbNTdAnlDzTUAmNROQTWpugDyh5ptOqhadVC06qVr0yS9TMwGZ1ExqJiBPAHlCzY2aCcik5gbIpGYCcgNkUnMD5DedVC06qVp0UrXok2VAJjU3aiYgT6h5Qs0EZAJyo+YGyKRmUvMEkCeATGomIDdq3jipWnRSteikatEn/xiQGzU3QCY1k5obNROQSc0EZFLzBJBJzaRmAjKpmYDcAPlNJ1WLTqoWnVQt+uTLgNyomYBMQCY1k5ongExqNgG5UTMBeQLIE2omIJOaTSdVi06qFp1ULfrkJTWb1DwB5EbNpGYTkEnNDZAbNU8AeQPIpOaNk6pFJ1WLTqoWffISkN+k5kbNBGSTmgnIDZBJzQTkBsik5kbNBGRS800nVYtOqhadVC36ZJmaTUDeUHMDZBOQSc0bar4JyKTmjZOqRSdVi06qFn3yZUCeUPOXqLkB8gSQTWp+00nVopOqRSdViz75PwfkDSA3am7UTEAmNTdAbtTcAJnUTGo2nVQtOqladFK16JM/Ts2/BGRSMwG5ATKpmdTcAJnU3AC5UfPGSdWik6pFJ1WLPvkyNf+SmgnIpOYGyI2aCcgTap4AMqm5UfObTqoWnVQtOqlahD/yApDfpGYCcqPmCSCTmgnIjZoJyKRmE5AbNROQSc2mk6pFJ1WLTqoW4Y9ULTmpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoW/Q+LNWELi0RsHwAAAABJRU5ErkJggg=="
            
            // Assert
            expect(response.body).to.equal(expectedResponse);
        });
    });
});