package com.keystone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Centralizes exception handling for the KEYSTONE API, translating
 * unhandled exceptions into a consistent, structured JSON error
 * response rather than a default container error page or stack trace.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles invalid-argument failures raised by the service layer
     * (e.g. a duplicate email on registration), returning a
     * {@code 400 Bad Request} response.
     *
     * @param ex the exception that was thrown
     * @return a structured error body with {@code 400} status
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase());
        body.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    /**
     * Handles any exception not covered by a more specific handler,
     * returning a {@code 500 Internal Server Error} response instead of
     * leaking an unstructured error page or stack trace to the client.
     *
     * @param ex the exception that was thrown
     * @return a structured error body with {@code 500} status
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put("error", HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        body.put("message", ex.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

}