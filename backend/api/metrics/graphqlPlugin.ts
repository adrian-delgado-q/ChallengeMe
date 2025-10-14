import type { ApolloServerPlugin } from '@apollo/server';
import { graphqlResolverDuration, graphqlRequestsTotal } from './prometheus';

export const metricsPlugin: ApolloServerPlugin = {
  async requestDidStart() {
    return {
      async didResolveOperation(requestContext) {
        const operationType = requestContext.operation?.operation;
        const operationName = requestContext.operationName || 'anonymous';
        
        // Increment GraphQL request counter
        graphqlRequestsTotal.inc({
          operation_type: operationType || 'unknown',
          operation_name: operationName,
          status: 'started',
        });
      },

      async willSendResponse(requestContext) {
        const operationType = requestContext.operation?.operation;
        const operationName = requestContext.operationName || 'anonymous';
        const hasErrors = requestContext.response.body.kind === 'single' && 
                         requestContext.response.body.singleResult.errors && 
                         requestContext.response.body.singleResult.errors.length > 0;
        
        // Update GraphQL request counter with final status
        graphqlRequestsTotal.inc({
          operation_type: operationType || 'unknown',
          operation_name: operationName,
          status: hasErrors ? 'error' : 'success',
        });
      },

      async executionDidStart() {
        return {
          willResolveField({ info }) {
            const startTime = Date.now();
            
            return (error, result) => {
              const duration = (Date.now() - startTime) / 1000; // Convert to seconds
              const status = error ? 'error' : 'success';
              
              // Record resolver execution time
              graphqlResolverDuration
                .labels({
                  resolver_name: info.parentType.name,
                  field_name: info.fieldName,
                  status,
                })
                .observe(duration);
            };
          },
        };
      },
    };
  },
};
