
package com.Tdb.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ExceptionRecursoNoEncontrado extends RuntimeException{
    
    public ExceptionRecursoNoEncontrado(String message) {
        super(message);
    }
}
