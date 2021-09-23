import {schema} from 'normalizr';
import {IContact} from '~/typings/db';

export const contactEntity = new schema.Entity<IContact>('contacts');
