import * as yup from 'yup';

export const questionnaireAssignmentValidationSchema = yup.object().shape({
  patient_id: yup.string().nullable().required(),
  questionnaire_id: yup.string().nullable().required(),
  assigned_by: yup.string().nullable().required(),
});
