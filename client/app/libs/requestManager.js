import request from 'axios';
import apiUrl from './apiUrl';
//mocha2 fail console.log(ReactOnrails);
import ReactOnRails from 'react-on-rails';

export default {

  /**
   * Retrieve list of entities from server using AJAX call.
   *
   * @returns {Promise} - Result of ajax call.
   */
  fetchEntities(url) {
    return request({
      method: 'GET',
      url,
      responseType: 'json',
    });
  },

  /**
   * Submit new entity to server using AJAX call.
   *
   * @param {Object} entity - Request body to post.
   * @returns {Promise} - Result of ajax call.
   */
  submitEntity(entity, url) {
    return request({
      method: 'POST',
      url: apiUrl[entity.type],
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: entity,
    });
  },

};
