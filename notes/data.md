```
profiles: collection;
    sketches: subcollection;
        title: string;
        content: string;
```

```yaml
/users collection
    /{uid} document
        username: string (unique)
        phase2 created: timestamp


/sketches collection
    /{uid} document
        ownerId: uid
        ownerUsername: string
        visibility: private | public | listed
        title: string
        source: string

        phase2 created: timestamp
        phase2 updated: timestamp

        phase2 editerIds: [uid]
        phase2 editerHandles: [string]
        phase2 viewerIds: [uid]
```

read

- get
- list

write

- create
- updade
- delete
