/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IProgressLimit } from "./progressBar";

export const calcGradient = (value: number, progressLimits: IProgressLimit[]) => {
    return { background: `linear-gradient(90deg, ${gradientMap(value, progressLimits).join(", ")})` };
};

export const gradientMap = (value: number, progressLimits: IProgressLimit[]) => {
    const newVal = value * 100;
    const final = progressLimits.reduce(
        (acc, pl) => {
            const endValue = newVal < pl.end ? newVal : pl.end;
            if (newVal > pl.start) {
                acc.values.push(`${pl.color} ${Math.round(pl.start)}%`);
                acc.values.push(`${pl.color} ${Math.round(endValue)}%`);
            }
            acc.lastVal = endValue;
            return acc;
        },
        { lastVal: 0, values: [] }
    );
    if (newVal < 100) {
        final.values.push(`#666666 ${final.lastVal}%`);
        final.values.push(`#666666 ${100 - newVal}%`);
    }
    return final.values;
};
