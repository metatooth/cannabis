import HTTP from "@/api/http";

import {
  ADD_PROFILE,
  ADD_ZONE,
  ADD_ZONE_DEVICE,
  Device,
  EDIT_DEVICE,
  EDIT_PROFILE,
  EDIT_WORKER,
  EDIT_ZONE,
  Profile,
  REMOVE_DEVICE,
  REMOVE_PROFILE,
  REMOVE_ZONE,
  REMOVE_ZONE_DEVICE,
  SET_DEVICES,
  SET_PROFILES,
  SET_WORKERS,
  SET_ZONES,
  Worker,
  Zone
} from "./mutation-types";

export default {
  getZones({ commit }) {
    HTTP.get("/zones").then(response => {
      commit(SET_ZONES, response.data);
    });
  },

  getProfiles({ commit }) {
    HTTP.get("/profiles").then(response => {
      commit(SET_PROFILES, response.data);
    });
  },

  getDevices({ commit }) {
    HTTP.get("/devices").then(response => {
      commit(SET_DEVICES, response.data);
    });
  },

  removeDevice({ commit }, zone) {
    HTTP.delete(`/devices/${zone.id}`);
    commit(REMOVE_DEVICE, zone);
  },

  getWorkers({ commit }) {
    HTTP.get("/workers").then(response => {
      commit(SET_WORKERS, response.data);
    });
  },

  addZoneDevice({ commit }, payload: { zoneid: number; device: string }) {
    const json = JSON.stringify({ device: payload.device });
    HTTP.post(`/zones/${payload.zoneid}/devices`, json).then(response => {
      commit(ADD_ZONE_DEVICE, response.data);
    });
  },

  addZone({ commit }, zone: Zone) {
    const json = JSON.stringify(zone);
    HTTP.post("/zones", json).then(response => {
      commit(ADD_ZONE, response.data);
    });
  },

  removeZoneDevice({ commit }, payload: { zoneid: number; device: string }) {
    HTTP.delete(`/zones/${payload.zoneid}/devices/${payload.device}`);
    commit(REMOVE_ZONE_DEVICE, payload);
  },

  removeZone({ commit }, zone: Zone) {
    HTTP.delete(`/zones/${zone.id}`);
    commit(REMOVE_ZONE, zone);
  },

  editZone({ commit }, zone: Zone) {
    const json = JSON.stringify(zone);
    HTTP.put(`/zones/${zone.id}`, json).then(response => {
      commit(EDIT_ZONE, response.data);
    });
  },

  addProfile({ commit }, profile: Profile) {
    const json = JSON.stringify(profile);
    HTTP.post("/profiles", json).then(response => {
      commit(ADD_PROFILE, response.data);
    });
  },

  removeProfile({ commit }, profile: Profile) {
    HTTP.delete(`/profiles/${profile.id}`);
    commit(REMOVE_PROFILE, profile);
  },

  editProfile({ commit }, profile: Profile) {
    const json = JSON.stringify(profile);
    HTTP.put(`/profiles/${profile.id}`, json).then(response => {
      commit(EDIT_PROFILE, response.data);
    });
  },

  editDevice({ commit }, device: Device) {
    const json = JSON.stringify(device);
    HTTP.put(`/devices/${device.device}`, json).then(response => {
      commit(EDIT_DEVICE, response.data);
    });
  },

  editWorker({ commit }, worker: Worker) {
    const json = JSON.stringify(worker);
    HTTP.put(`/workers/${worker.worker}`, json).then(response => {
      commit(EDIT_WORKER, response.data);
    });
  }
};
