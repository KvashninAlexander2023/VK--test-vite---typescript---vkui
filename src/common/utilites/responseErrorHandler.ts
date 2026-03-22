import { isAxiosError } from 'axios'
import type { ErrorResponse } from './types'


export const responseErrorHandler = (error: unknown, setError?: Function) => {
  const basicErrorMessage = 'Something went wrong'

  if (isAxiosError(error)) {
    if (error.code === 'ERR_CANCELED') {
      return
    }

    let errorData
    let errorText

    if (error.response) {
      errorData = error.response?.data as ErrorResponse

      if (Array.isArray(errorData.messages)) {
        errorText =
          errorData.messages.length > 0
            ? errorData.messages[0].message
            : error.message
        if (setError) {
          errorData.messages.forEach(({ field, message }) => {
            setError(field, { message })
          })
        }
      } else {
        errorText = errorData.messages
      }
    } else {
      errorText = error.message
    }
    console.log(errorText ?? basicErrorMessage);
    return
  }
  if (error instanceof Error) {
    console.log(error.message);
    return
  }
  console.log(basicErrorMessage);
  return
}
