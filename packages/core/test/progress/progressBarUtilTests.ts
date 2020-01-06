/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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

import { expect } from "chai";
import { calcGradient } from "../../src/components/progress-bar/progressBarUtils";

describe("ProgressBarUtils", () => {
    it("test the multi-color gradient function", () => {
        const value = 80;
        const progressLimits = [
            { color: "#1F4B99", start: 0, end: 25 },
            { color: "#6B9FA1", start: 25, end: 50 },
            { color: "#FFE39F", start: 50, end: 75 },
            { color: "#D78742", start: 75, end: 100 }
        ];
        const gradient = calcGradient(value, progressLimits);
        const expectedGradient =
            "linear-gradient(90deg, #1F4B99 0%, #1F4B99 25%, #6B9FA1 25%, #6B9FA1 50%, #FFE39F 50%, #FFE39F 75%, #D78742 75%, #D78742 80%, #666666 80%, #666666 20%)";
        expect(gradient).to.equal(expectedGradient);
    });
});
