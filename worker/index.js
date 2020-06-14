const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) {
    return 1;
  }

  let prev = 1,
    curr = 1,
    i = 1;

  while (i < index) {
    i++;
    const tmp = curr;
    curr += prev;
    prev = tmp;
  }

  return curr;
}

sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});

sub.subscribe("insert");
