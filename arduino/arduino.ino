#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2591.h>
#include <Adafruit_VCNL4010.h>
#include "DHT.h"
#include <Adafruit_TSL2561_U.h>
#include <Wire.h>

int dh1_pin = 2;
int dh2_pin = 0;

#define dhTYPE DHT11
DHT dh1(dh1_pin, dhTYPE);
DHT dh2(dh2_pin, dhTYPE);

void setup() {
  Serial.begin(9600);
  dh1.begin();
  dh2.begin();
}

float temperature = 0.0;
float humidity = 0.0;

const float K = 273.15;

void loop() {
  temperature = dh1.readTemperature();
  humidity = dh1.readHumidity();

  Serial.println("t:" + String(temperature));
  Serial.println("h:" + String(humidity));
  delay(1300);
}
