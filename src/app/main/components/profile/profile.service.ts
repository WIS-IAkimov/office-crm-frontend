import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProfileModel } from './profile.model';
import { PositionModel } from './position.model';
import { SpecializationModel } from './specialization.model';
import {consoleTestResultsHandler} from 'tslint/lib/test';

@Injectable()
export class ProfileService {
  constructor(private apollo: Apollo) { }

  public getPositions(): Observable<PositionModel[]> {
    return this.apollo.query<PositionModel[]>({
      query: gql`
        query {
          positions {
            id
            name
          }
        }
      `
    })
    .map((results: any) => results.data.positions.map((position) => new PositionModel(position)));
  }

  public getSpecializations(): Observable<SpecializationModel[]> {
    return this.apollo.query<SpecializationModel[]>( {
      query: gql`
        query {
          specializations {
            id
            name
          }
        }
      `
    })
    .map((results: any) => results.data.specializations
      .map((specialization) => new SpecializationModel(specialization)));
  }

  public getProfiles(): Observable<ProfileModel> {
    return this.apollo.query<ProfileModel>({
      query: gql`
        query{
          employees {
            id
            firstName
            middleName
            lastName
            birthday
            workStarted
            position {
              id
              name
            }
            phoneNumber
            additionalPhoneNumber
            contactEmail
          }
        }
      `,
    })
    .map((results: any) => results.data.employees[0]);
  };

}