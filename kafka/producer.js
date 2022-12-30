const { Kafka } = require('kafkajs');
const Chance = require('chance');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094']
});

const producer = kafka.producer();
const chance = new Chance();

async function produce(){
  const value = chance.animal();
  
  console.log({value});

  await producer.connect();

  await producer.send({
    topic: 'test-topic',
    messages: [
      { value },
    ],
  });

  await producer.disconnect();
}

setInterval(produce, 1000);