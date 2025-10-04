// 代码生成时间: 2025-10-04 21:10:41
// Import necessary modules
const net = require('net');

// Define a simple error class for RPC errors
class RPCError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RPCError';
  }
}

// Define the RPC client
class RPCClient {
  constructor(host, port) {
    this.client = net.createConnection({
      host,
      port
    }, () => {
      console.log('Connected to RPC server');
    });
  }

  // Call a remote method with arguments
  call(method, ...args) {
    return new Promise((resolve, reject) => {
      // Prepare the request payload
      const payload = JSON.stringify({ method, args });

      // Send the payload to the server
      this.client.write(payload, 'utf8', () => {
        console.log('Sent request to RPC server');
      });

      // Handle the response from the server
      let responseData;
      this.client.on('data', (chunk) => {
        responseData = chunk.toString('utf8');
        this.client.end(); // Close the connection after receiving the response
      });

      // Handle errors
      this.client.on('error', (err) => {
        reject(new RPCError(`Connection error: ${err.message}`));
      });

      this.client.on('end', () => {
        // Parse the response data
        try {
          const response = JSON.parse(responseData);
          if (response.error) {
            reject(new RPCError(response.error));
          } else {
            resolve(response.result);
          }
        } catch (err) {
          reject(new RPCError('Failed to parse response'));
        }
      });
    });
  }
}

// Define the RPC server
class RPCServer {
  constructor(port) {
    this.server = net.createServer((connection) => {
      console.log('New client connected');

      connection.on('data', (data) => {
        try {
          const payload = JSON.parse(data.toString('utf8'));
          const { method, args } = payload;

          // Find the method to call
          const handler = this.getMethodHandler(method);
          if (!handler) {
            throw new Error('Method not found');
          }

          // Call the method and send the response
          const result = handler(...args);
          const response = JSON.stringify({ result });
          connection.write(response, 'utf8');
        } catch (err) {
          const errorResponse = JSON.stringify({ error: err.message });
          connection.write(errorResponse, 'utf8');
        }
      });

      connection.on('error', (err) => {
        console.error('Connection error:', err.message);
      });
    });
  }

  // Start the server
  start() {
    this.server.listen(port, () => {
      console.log(`RPC server started on port ${port}`);
    });
  }

  // Register a method handler
  register(method, handler) {
    this.handlers = this.handlers || {};
    this.handlers[method] = handler;
  }

  // Get a method handler
  getMethodHandler(method) {
    return this.handlers ? this.handlers[method] : null;
  }
}

// Example usage
// Define a method handler
function add(a, b) {
  return a + b;
}

// Create an RPC server and register the 'add' method
const server = new RPCServer(1234);
server.register('add', add);
server.start();

// Create an RPC client and call the 'add' method
const client = new RPCClient('localhost', 1234);
client.call('add', 1, 2)
  .then(result => console.log('Result:', result))
  .catch(err => console.error('Error:', err.message));
