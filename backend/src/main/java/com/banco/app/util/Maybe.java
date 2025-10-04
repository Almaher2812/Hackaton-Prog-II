package com.banco.app.util;

import java.util.function.Function;

public class Maybe<T> implements Monad<T> {
    private final T value;

    private Maybe(T value) { this.value = value; }

    public static <T> Maybe<T> of(T value){
        return value == null ? empty() : new Maybe<>(value);
    }

    public static <T> Maybe<T> empty(){ return new Maybe<>(null); }

    @Override
    public <R> Maybe<R> map(Function<T, R> f){
        if(value == null) return empty();
        return of(f.apply(value));
    }

    @Override
    public <R> Maybe<R> flatMap(Function<T, Monad<R>> f){
        if(value == null) return empty();
        return (Maybe<R>) f.apply(value);
    }

    public boolean isEmpty(){ return value == null; }

    public T get(){ return value; }
}
