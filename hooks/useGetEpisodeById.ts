"use client"



/**
On the initial render, useMemo returns the result of calling calculateValue with no arguments.
During next renders, it will either return an already stored value from the last render (if the dependencies haven’t changed), or call calculateValue again, and return the result that calculateValue has returned.
 */