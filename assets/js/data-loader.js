"use strict";

async function loadJsonFile(path, fallbackValue) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`Unable to load JSON from "${path}".`, error);
    return fallbackValue;
  }
}

async function loadExercises() {
  const exercises = await loadJsonFile("./data/exercises.json", []);
  return isArray(exercises) ? exercises : [];
}

async function loadWorkoutPlans() {
  const plans = await loadJsonFile("./data/workout-plans.json", []);
  return isArray(plans) ? plans : [];
}
