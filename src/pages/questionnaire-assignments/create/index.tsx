import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createQuestionnaireAssignment } from 'apiSdk/questionnaire-assignments';
import { Error } from 'components/error';
import { questionnaireAssignmentValidationSchema } from 'validationSchema/questionnaire-assignments';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PatientInterface } from 'interfaces/patient';
import { QuestionnaireInterface } from 'interfaces/questionnaire';
import { UserInterface } from 'interfaces/user';
import { getPatients } from 'apiSdk/patients';
import { getQuestionnaires } from 'apiSdk/questionnaires';
import { getUsers } from 'apiSdk/users';
import { QuestionnaireAssignmentInterface } from 'interfaces/questionnaire-assignment';

function QuestionnaireAssignmentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: QuestionnaireAssignmentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createQuestionnaireAssignment(values);
      resetForm();
      router.push('/questionnaire-assignments');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<QuestionnaireAssignmentInterface>({
    initialValues: {
      patient_id: (router.query.patient_id as string) ?? null,
      questionnaire_id: (router.query.questionnaire_id as string) ?? null,
      assigned_by: (router.query.assigned_by as string) ?? null,
    },
    validationSchema: questionnaireAssignmentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Questionnaire Assignment
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<PatientInterface>
            formik={formik}
            name={'patient_id'}
            label={'Select Patient'}
            placeholder={'Select Patient'}
            fetcher={getPatients}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.first_name}
              </option>
            )}
          />
          <AsyncSelect<QuestionnaireInterface>
            formik={formik}
            name={'questionnaire_id'}
            label={'Select Questionnaire'}
            placeholder={'Select Questionnaire'}
            fetcher={getQuestionnaires}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'assigned_by'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'questionnaire_assignment',
  operation: AccessOperationEnum.CREATE,
})(QuestionnaireAssignmentCreatePage);
