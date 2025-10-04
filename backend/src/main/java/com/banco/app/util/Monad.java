package com.banco.app.util;

import java.util.function.Function;

public interface Monad<T> {
    <R> Monad<R> map(Function<T, R> f);
    <R> Monad<R> flatMap(Function<T, Monad<R>> f);
}
