import Axios from "axios";

export default {
    namespaced: true,
    state: {
        entities: null,
        base: 'http://localhost:7654/',
        schema: null,
        content: null
    },
    getters: {
        $service(state) {
            return Axios.create({
                baseURL: state.base,
                headers: {
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmUzODMxNzJhOGNiNWM0ZTU2N2VhZTNhMGQ1OGM4NzJjMGRiNmE4YzZkNzgzMzY1ODEyYmU0OGRjYTk4OGEyYzhiNjdlODkzZGM5YmNlYWEiLCJpYXQiOjE1ODA4MTEyNjgsIm5iZiI6MTU4MDgxMTI2OCwiZXhwIjoxNjEyNDMzNjY4LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.ML6RTmcOMhnUxA1irZwvXBTHDvH5Jz0YZ--G5t7QOt3cpr4-RYSXRSErMwZd5omZ0TQEszSyPYM_FTFu6SbzSlWRnk-9md4J6P8TcYA_g4c0c8D4OldnJXNUfqnCfFw11Vd-KzOxTD_Qt-1bhwVRgdt7leAEcxYv3zSl0k5ahDn01fmzpZblXFUZHvjCI4qqg2MuFZyrSHgQh0D4UJw3JLThKceKQVWhP00p7SLhcwt0hWollaiBp9wLkUAitCLgX7PVmVBRjsCLVH_Z8rKIkTlQZLJwT83vZksbD-LIRvL2LhA7viOcvjtf2vWtH2HzoAXDF6K9LvcxeHv5bW7FthqKm1adX0zWykJiJ4dQgYBT_Wl_11i19QNzZ2apJi5SOdV5FJw4vuO77qcJssgMBJx9W39VMOy6svuSLhO9AGoxBbqfzxIXhM54iQnQPJCYLnf7RYGIt-loDVwueLo1GOw7mLoPlmuVk7FGxSBal1hN69FzmwRcSuh8023qYpHn-yFiqUGDO-MZp3O4kC3JGyXHfaDYhbLpAXeZAUEwi7A6ySB060NESUMrGT4cT_HTXDjId-ayz0o0FNzx4RdNk847dk9P_1Pq74BQRA7alDn1JCeifseIT9sFl13orGJBdrBqL3WxbhAYmvGG8lqYSY98vQUrn78LAgnMN26BEqY'
                },
                validateStatus: function (status) {
                    return (status >= 200 && status < 300) || status === 303;
                },
            })
        },
        getEntity(state) {
            return (name) => {
                return state.entities.find((ent) => ent.name === name);
            }
        }
    },
    mutations: {
        setEntities(state, val) {
            state.entities = val;
        },
        setSchema(state, val) {
            state.schema = val;
        },
        setContent(state, val) {
            state.content = val;
        }
    },
    actions: {
        async loadEntities({getters, commit}) {
            let request = await getters.$service.get('/flashpoint/service/entities');
            commit('setEntities', request.data);
        },
        async loadCollection({getters, commit}, {name}) {
            let request = await getters.$service.get(`/flashpoint/service/entities/${name}/schema`);
            commit('setSchema', request.data);
        },
        async loadEntity({getters, commit}, {name, id, sequence}) {
            try {
                let url = `/flashpoint/service/entities/${name}/schema/${id}`;
                if(sequence) {
                    url = `${url}/${sequence}`;
                }

                let request = await getters.$service.get(url);
                commit('setSchema', request.data);
            } catch (e) {
                commit('setSchema', null);
            }
        },
        async loadContent({getters, commit}, {name}) {
            let request = await getters.$service.get(`/flashpoint/service/entities/${name}/content`);
            commit('setContent', request.data);
        },
        async createEntity({getters, commit}, {name}) {
            let request = await getters.$service.post(`/flashpoint/service/entities/${name}/schema/create`);
            return request.data;
        },
        async triggerEvent({getters, commit, dispatch}, {name, id, event, ...args}) {
            let request = await getters.$service.post(`/flashpoint/service/entities/${name}/schema/${id}`, {
                event,
                ...args
            });
            await dispatch('loadEntity', {name, id: request.data.id});
        }
    }
}