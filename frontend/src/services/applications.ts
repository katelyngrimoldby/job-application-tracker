import axios from 'axios';
import { NewApplication, Application } from '../types';
const baseUrl = '/api/applications';

const getAll = async (token: string, userid: number, params?: string) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.get<Application[]>(
    `${baseUrl}/${params ? params : ''}`,
    config
  );

  return response.data.map((application) => {
    return {
      ...application,
      applyDate: new Date(application.applyDate),
      interviewDate: application.interviewDate
        ? new Date(application.interviewDate)
        : null,
      assessmentDate: application.assessmentDate
        ? new Date(application.assessmentDate)
        : null,
      rejectionDate: application.rejectionDate
        ? new Date(application.rejectionDate)
        : null,
      offerDate: application.offerDate ? new Date(application.offerDate) : null,
    } as Application;
  });
};

const addNew = async (
  token: string,
  userid: number,
  payload: NewApplication
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.post<Application>(`${baseUrl}`, payload, config);

  return {
    ...response.data,
    applyDate: new Date(response.data.applyDate),
    interviewDate: response.data.interviewDate
      ? new Date(response.data.interviewDate)
      : null,
    assessmentDate: response.data.assessmentDate
      ? new Date(response.data.assessmentDate)
      : null,
    rejectionDate: response.data.rejectionDate
      ? new Date(response.data.rejectionDate)
      : null,
    offerDate: response.data.offerDate
      ? new Date(response.data.offerDate)
      : null,
  } as Application;
};

const edit = async (
  token: string,
  payload: NewApplication,
  userid: number,
  id: number
) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.put<Application>(
    `${baseUrl}/${id}`,
    payload,
    config
  );

  return {
    ...response.data,
    applyDate: new Date(response.data.applyDate),
    interviewDate: response.data.interviewDate
      ? new Date(response.data.interviewDate)
      : null,
    assessmentDate: response.data.assessmentDate
      ? new Date(response.data.assessmentDate)
      : null,
    rejectionDate: response.data.rejectionDate
      ? new Date(response.data.rejectionDate)
      : null,
    offerDate: response.data.offerDate
      ? new Date(response.data.offerDate)
      : null,
  } as Application;
};

const remove = async (token: string, userid: number, id: number) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      userid,
    },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export { getAll, addNew, edit, remove };
