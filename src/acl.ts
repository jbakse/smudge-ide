import Vue from 'vue';
import Acl from 'vue-browser-acl';
import { auth } from '@/firebase/auth';

Vue.use(Acl, auth, (acl: any) => {
  acl.rule('write', 'sketch', (u: any, sketch: any) => {
    return u.uid === sketch.ownerId;
  });

  acl.rule('write', 'profile', (u: any, profile: any) => {
    return u.uid === profile.id;
  });

  acl.rule('be', 'profile', (u: any, profile: any) => {
    return u.uid === profile.id;
  });

  acl.subjectMapper = (subject: any) => {
    let mappedValue = 'unknown';
    if (typeof subject === 'string') mappedValue = subject;
    if (typeof subject === 'object') {
      mappedValue = 'object';
      if (
        hasAllProperties(subject, [
          'id',
          'ownerId',
          'ownerUsername',
          'source',
          'title',
        ])
      ) {
        mappedValue = 'sketch';
      }

      if (
        hasAllProperties(subject, ['displayName', 'id', 'photoURL', 'username'])
      ) {
        mappedValue = 'profile';
      }
    }
    return mappedValue;
  };
});

function hasAllProperties(subject: object, keys: string[]) {
  return keys.every((key) => subject.hasOwnProperty(key));
}
