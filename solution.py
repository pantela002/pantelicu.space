def validate_and_fix_prices(prices: dict[str, float]) -> dict:
    fixed = prices.copy()
    issues = []

    # (expected_ratio, low_ratio, high_ratio) all relative to X = casco_100
    ratios = {
        "casco_100":         (1.0000, 0.9100, 1.2000),
        "casco_200":         (0.8500, 0.8300, 0.9000),
        "casco_500":         (0.8000, 0.7800, 0.8200),
        "limited_casco_100": (0.7500, 0.7300, 0.7700),
        "limited_casco_200": (0.6375, 0.6100, 0.7200),
        "limited_casco_500": (0.5625, 0.5000, 0.6000),
        "mtpl":              (0.3600, 0.2600, 0.4600)
    }

    LC_MTPL_TARGET = 9 / 5
    C_LC_TARGET = 12 / 9

    best_anchor = None
    min_issues = float("inf")
    min_mse = float("inf")

    for anchor in ratios:
        exp, lo, hi = ratios[anchor]
        X = prices[anchor] / exp

        candidate_issues = []
        candidate = dict(prices)
        for k in ratios:
            if k == anchor:
                continue
            e, l, h = ratios[k]
            if not (l * X <= prices[k] <= h * X):
                candidate_issues.append(f"{k} adjusted from {prices[k]} to {round(e * X, 2)}")
                candidate[k] = e * X

        lc_mtpl_ratio = candidate["limited_casco_100"] / candidate["mtpl"]
        c_lc_ratio = candidate["casco_100"] / candidate["limited_casco_100"]
        mse = ((lc_mtpl_ratio - LC_MTPL_TARGET) ** 2 + (c_lc_ratio - C_LC_TARGET) ** 2) / 2

        print(f"Anchor={anchor} (X={round(X, 2)}): {len(candidate_issues)} issue(s), MSE={round(mse, 4)}")
        for msg in candidate_issues:
            print(f"  - {msg}")

        if len(candidate_issues) < min_issues or (len(candidate_issues) == min_issues and mse < min_mse):
            min_issues = len(candidate_issues)
            min_mse = mse
            best_anchor = anchor

    X = prices[best_anchor] / ratios[best_anchor][0]
    for k in ratios:
        if k == best_anchor:
            continue
        exp, lo, hi = ratios[k]
        if not (lo * X <= prices[k] <= hi * X):
            old = fixed[k]
            fixed[k] = round(exp * X, 2)
            issues.append(f"{k} adjusted from {old} to {fixed[k]} (anchor: {best_anchor}, X={round(X, 2)})")

    return {"fixed_prices": fixed, "issues": issues}


# --- Local testing only ---
example_prices = {
    "mtpl": 400,
    "limited_casco_100": 850,
    "limited_casco_200": 900,
    "limited_casco_500": 700,
    "casco_100": 780,
    "casco_200": 950,
    "casco_500": 800,
}

if __name__ == "__main__":
    result = validate_and_fix_prices(example_prices)
    print("\nBest anchor fixed prices:", result["fixed_prices"])
    print("Issues found:")
    for issue in result["issues"]:
        print("-", issue)
