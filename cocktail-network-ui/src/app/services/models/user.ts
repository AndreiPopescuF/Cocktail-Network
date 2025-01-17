/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Cocktail } from '../models/cocktail';
import { GrantedAuthority } from '../models/granted-authority';
import { Role } from '../models/role';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  cocktails?: Array<Cocktail>;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  email?: string;
  enabled?: boolean;
  firstname?: string;
  id?: number;
  lastModifiedDate?: string;
  lastname?: string;
  name?: string;
  password?: string;
  roles?: Array<Role>;
  status?: 'ONLINE' | 'OFFLINE';
  username?: string;
}
