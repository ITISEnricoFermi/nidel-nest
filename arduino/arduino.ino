#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2591.h>
#include <Adafruit_VCNL4010.h>
#include "DHT.h"
#include <Adafruit_TSL2561_U.h>
#include <Wire.h>

int dht_internal_pin = 3;
int dht_external_pin = 2;

#define dhTYPE DHT22
DHT dht_internal(dht_internal_pin, dhTYPE);
DHT dht_external(dht_external_pin, dhTYPE);

void setup() {
  Serial.begin(9600);
  dht_internal.begin();
  dht_external.begin();
}

float temperature_internal = 0.0;
float humidity_internal = 0.0;

float temperature_external = 0.0;
float humidity_external = 0.0;

const float K = 273.15;

void loop() {
  temperature_internal = dht_internal.readTemperature();
  humidity_internal = dht_internal.readHumidity();

  Serial.println("t_int:" + String(temperature_internal));
  Serial.println("h_int:" + String(humidity_internal));

  temperature_external = dht_external.readTemperature();
  humidity_external = dht_external.readHumidity();

  Serial.println("t_ext:" + String(temperature_external));
  Serial.println("h_ext:" + String(humidity_external));

  delay(1300);
}
