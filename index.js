'use strict';

const { VectorStoreSupabaseExtended } = require('./dist/nodes/VectorStoreSupabaseExtended/VectorStoreSupabaseExtended.node.js');
const { SupabaseApi } = require('./dist/credentials/SupabaseApi.credentials.js');

module.exports = {
	nodes: [VectorStoreSupabaseExtended],
	credentials: [SupabaseApi],
};
