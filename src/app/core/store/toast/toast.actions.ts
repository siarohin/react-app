import { createAction } from "@reduxjs/toolkit";

/**
 * SHOW_SUCCESS_TOAST
 */
export const showSuccessToast = createAction<{ message: string }>("[ReactMovie] SHOW_SUCCESS_TOAST");

/**
 * SHOW_FAIL_TOAST
 */
export const showFailToast = createAction<{ message: string }>("[ReactMovie] SHOW_FAIL_TOAST");
