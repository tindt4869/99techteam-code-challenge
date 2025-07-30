### 1. Incorrect Filtering Logic and Undefined Variable

```ts
if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
```

- `lhsPriority` is `undefined` — should be `balancePriority`
- Filtering in `amount <= 0` is logically incorrect

### 2. Redundant `prices` Dependency in `useMemo`

- `prices` is included in `useMemo` but not used

### 3. Repeated Priority Computation in Sorting

```ts
.sort((lhs, rhs) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  ...
})

```

- Precompute priority then sort for better performance

### 4. `formattedBalances` Not Memoized

- Computed every render without dependency tracking.

### 5. Index Used as React `key`

```tsx
<WalletRow
  className={classes.row}
  key={index}
  amount={balance.amount}
  usdValue={usdValue}
  formattedAmount={balance.formatted}
/>
```

- Can lead to rendering bugs if order changes

### 6. Missing `blockchain` Field in Interface

- `WalletBalance` uses `balance.blockchain` but doesn't define it

### 7. Unsafe Price Lookup

```ts
const usdValue = prices[balance.currency] * balance.amount;
```

- Can result in `NaN` if price not found

### 8. `getPriority` should be defined outside the component

- `getPriority()` doesn’t depend on any component state or props.

### 9. Typing Mismatch in `sortedBalances.map()`

```ts
const rows = sortedBalances.map((balance: FormattedWalletBalance, ...) => { ... });
```

- Incorrectly typed: `sortedBalances` are not `FormattedWalletBalance`

### 10. `sortedBalances` does not contain `.formatted`

```ts
const rows = sortedBalances.map(
  (balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  }
);
```

- should be `formattedBalances.map(...)`

### 11. `rows` recompute on every render, even when `sortedBalances` and `prices` haven't change

```ts
const rows = sortedBalances.map(
  (balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  }
);
```

- memoizing rows using `useMemo`
