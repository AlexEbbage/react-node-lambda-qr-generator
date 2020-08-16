const chai = require("chai");
const expect = chai.expect;
const assert = require("assert");
const handler = require("./handler");


describe("handler.js => generateCode", () => {
    describe("event", () => {
        it("throws_TypeError_with_null_SSID", async () => {
            // Arrange
            const event = {
                body: {
                    SSID: null,
                    password: "test"
                }
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
                body: {
                    SSID: {},
                    password: "test"
                }
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
                body: {
                    SSID: "test",
                    password: null
                }
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
                body: {
                    SSID: "test",
                    password: {}
                }
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
                body: {
                    SSID: "test",
                    password: "test",
                    type: "test",
                    hidden: false
                }
            };

            // Act
            let response = await handler.generateCode(event);

            let expectedResponse = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATNSURBVO3BQY4cSRIEQdNA/f/Lun30UwCJ9OohuSaCP1K15KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVr0yUtAfpOaCcgbap4AcqPmCSCTmgnIb1LzxknVopOqRSdViz5ZpmYTkDfU3ACZ1ExAbtTcAJnUvKFmE5BNJ1WLTqoWnVQt+uTLgDyh5gk1E5AJyBNA/iZAnlDzTSdVi06qFp1ULfrkLwdkUjMBmdRsAvKGmn/JSdWik6pFJ1WLPvnLqZmATGpugNyouVEzAfl/dlK16KRq0UnVok++TM1vUvOEmhsgk5o3gNyoeULNn+SkatFJ1aKTqkWfLAPym4BMaiYgk5oJyKTmCSCTmgnIpGYC8gSQP9lJ1aKTqkUnVYvwR/5iQCY1TwB5Qs0NkCfU/EtOqhadVC06qVr0yUtAJjUTkBs1E5An1ExAJjXfBGRSMwF5A8ik5gbIpGYCcqPmjZOqRSdVi06qFn3ykpoJyKTmBsik5gkgk5oJyKTmRs0NkD8JkCfUTEA2nVQtOqladFK16JOXgExqboDcALlRM6mZgExq3gByo+ZGzQTkCTU3ap4A8k0nVYtOqhadVC365D+m5g0gk5oJyBNA3gByo+YGyKRmAjKpeUPNppOqRSdVi06qFn2yDMgTQJ5Q84aaCcik5k8C5A0gN0AmNW+cVC06qVp0UrXok5fUTEAmNd+kZgIyqblRMwGZ1HwTkEnNBOQGyI2aGyCbTqoWnVQtOqla9MkvA7JJzaTmBsikZlIzAZnUTEAmNROQCcgNkG8C8k0nVYtOqhadVC365MuA3KiZgExqNqmZgNyomYBMaiYgN2omIJOaCcikZgLyhJpvOqladFK16KRqEf7IIiCTmhsgk5oJyI2aCciNmk1AbtQ8AWRSMwGZ1NwAuVGz6aRq0UnVopOqRfgjXwTkCTVPALlRcwPkRs1/CciNmgnIpOY3nVQtOqladFK16JOXgExqJjVvAPkmNU8AmdRMQN5QM6mZgLwBZFKz6aRq0UnVopOqRfgjfxAgk5obIE+oeQPIjZoJyBNqJiCTmjeA3Kh546Rq0UnVopOqRfgji4DcqJmATGomIDdqJiA3am6ATGqeADKpmYD8l9R800nVopOqRSdVi/BH/mJAbtTcAHlCzRNAJjUTkEnNE0Bu1Pymk6pFJ1WLTqoWffISkN+k5gkgk5pJzQRkUnMDZFKzCcik5g0gN2reOKladFK16KRq0SfL1GwC8oSaGyA3am6ATGpu1Lyh5gk1T6jZdFK16KRq0UnVok++DMgTap5QMwG5UTMBuQHyBJBJzRNA/mYnVYtOqhadVC365C8HZFIzAZmATGomIDdqJiBPAJnUTEAmNTdAJiA3ar7ppGrRSdWik6pFn/xjgExqboBMam6APAFkUvMEkEnNpGYC8gSQSc0bJ1WLTqoWnVQt+uTL1HyTmjfUTEBu1ExAJjUTkAnIjZobIJOaGzUTkG86qVp0UrXopGrRJ8uA/CYgk5oJyBNqJiBPAJnU3ACZgNyoeQLIpOabTqoWnVQtOqlahD9SteSkatFJ1aKTqkUnVYtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqla9D/M/ihQEHzcfgAAAABJRU5ErkJggg==";

            // Assert
            expect(response.body).to.equal(expectedResponse);
        });
    });
});