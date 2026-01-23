import { toast } from 'react-toastify';
import { treeifyError } from 'zod';

export async function processServerResponse(res) {
  const ret = await res.json();
  if (!res.ok) {
    if (res.status === 404) {
      toast.error('Resource not found!');
    }

    if (res.status === 401 || res.status === 403) {
      toast.error(ret);
    }

    throw new Error('HTTP request error!');
  }
  return ret;
}

export function validateForm(formValues, schema) {
  const res = schema.safeParse(formValues);
  if (res.success !== false) {
    return null;
  }

  const treeErr = treeifyError(res.error);


  const errors = {};
  for (const fieldName in treeErr.properties) {    
    if (treeErr.properties[fieldName].properties) {
      for (const nestedField in treeErr.properties[fieldName].properties) {        
        if(!errors[fieldName]) {
          errors[fieldName] = {};
        }
        
        errors[fieldName][nestedField] =
          treeErr.properties[fieldName].properties[nestedField].errors[0];
      }
    } else {
      errors[fieldName] = treeErr.properties[fieldName].errors[0];
    }
  }  

  return errors;
}
