const PROTO_PATH = './customers.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const customers = [
    { id: 'sdf1', name: 'John Doe', age: 30, address: '123 Main St' },
    { id: 'sdf2', name: 'Jane Doe', age: 25, address: '456 Main St' },
    { id: 'sdf3', name: 'Jim Doe',  age: 35, address: '789 Main St' },
    { id: 'sdf4', name: 'Jack Doe', age: 28, address: '101 Main St' },
    { id: 'sdf5', name: 'Jill Doe', age: 32, address: '202 Main St' }
];  

server.addService(customersProto.CustomerService.service, {
    // call is similar to "this" in javasript, it contains the request and response objects
    // header, request params, etc all are available in call object
    // callback is a function that is called when the request is completed
    getAll: (call, callback) => {
        // db call happens here to get all customers from the database
        //  and return the response
        callback(null, { customers });
    },
    get: (call, callback) => {
        const customer = customers.find(c => c.id === call.request.id);
        if (customer) {
            callback(null, { customer });
        } else {
            callback(new Error('Customer not found'));
        }
    },
    insert: (call, callback) => {
        const newCustomer = call.request;
        newCustomer.id = `sdf${customers.length + 1}`;
        customers.push(newCustomer);
        callback(null, newCustomer);
    },
    update: (call, callback) => {
        const index = customers.findIndex(c => c.id === call.request.id);
        if (index !== -1) {
            customers[index] = { ...customers[index], ...call.request };
            callback(null, { customer: customers[index] });
        } else {
            callback(new Error('Customer not found'));
        }    
    },
    remove: (call, callback) => {
        const index = customers.findIndex(c => c.id === call.request.id);
        if (index !== -1) {
            const removedCustomer = customers.splice(index, 1)[0];
            callback(null, { customer: removedCustomer });
        } else {
            callback(new Error('Customer not found'));
        }
    }
});

(async () => {
  await new Promise((resolve, reject) => {
    server.bindAsync("127.0.0.1:1004", grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        reject(error);
      } else {
        resolve(port);
      }
    });
  });
})();