import { PatientInterface } from 'interfaces/patient';
import { QuestionnaireInterface } from 'interfaces/questionnaire';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface QuestionnaireAssignmentInterface {
  id?: string;
  patient_id: string;
  questionnaire_id: string;
  assigned_by: string;
  created_at?: any;
  updated_at?: any;

  patient?: PatientInterface;
  questionnaire?: QuestionnaireInterface;
  user?: UserInterface;
  _count?: {};
}

export interface QuestionnaireAssignmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  patient_id?: string;
  questionnaire_id?: string;
  assigned_by?: string;
}
