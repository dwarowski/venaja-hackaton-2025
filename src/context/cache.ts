//@ts-ignore
import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
    addTypename: false
});