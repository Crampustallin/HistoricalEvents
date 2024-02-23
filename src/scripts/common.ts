const compose = (...fns: any[]) => (args: any) => fns.reduce((composed: any, f) => f(composed), args); 

export default compose;
