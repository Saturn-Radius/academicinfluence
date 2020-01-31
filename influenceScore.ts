import * as squel from "./squel";

export function influenceScoreQuery(kind: string, start_year: number, stop_year: number) {
  const start = squel.str(
    "GREATEST(ai_data.scores.year_start,?)::float - ai_data.scores.year_start",
    start_year
  );
  const end = squel.str(
    "LEAST(scores.year_end + 1,?)::float - ai_data.scores.year_start",
    stop_year
  );

  const a_term = squel.str("scores.a * (? - ?)", end, start);
  const b_term = squel.str(
    "scores.b * (power(?, 2) - power(?,2)) / 2",
    end,
    start
  );
  const c_term = squel.str(
    "scores.c * (power(?, 3) - power(?,3)) / 3",
    end,
    start
  );

  const expression = squel.str("? + ? + ?", a_term, b_term, c_term);

  const adapted = squel.str(
    "ln(greatest(?,0.0) + exp(1.0)) / 15.0",
    expression
  );

  const query = squel
    .select()
    .from(squel.rstr("ai_data.scores"))
    .field(adapted, "influence")
    .where("scores.kind = ?", kind)


  return query;
}
