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

import classNames from "classnames";
import * as React from "react";
import { polyfill } from "react-lifecycles-compat";
import { AbstractPureComponent2, Classes } from "../../common";
import { DISPLAYNAME_PREFIX, IIntentProps, IProps } from "../../common/props";
import { clamp } from "../../common/utils";
import { calcGradient } from "./progressBarUtils";

export interface IProgressLimit {
    color: string;
    start: number;
    end: number;
}
export interface IProgressBarProps extends IProps, IIntentProps {
    /**
     * Whether the background should animate.
     * @default true
     */
    animate?: boolean;

    /**
     * Whether the background should be striped.
     * @default true
     */
    stripes?: boolean;

    /**
     * A value between 0 and 1 (inclusive) representing how far along the operation is.
     * Values below 0 or above 1 will be interpreted as 0 or 1, respectively.
     * Omitting this prop will result in an "indeterminate" progress meter that fills the entire bar.
     */
    value?: number;

    progressLimits?: IProgressLimit[];
}

@polyfill
export class ProgressBar extends AbstractPureComponent2<IProgressBarProps, {}> {
    public static displayName = `${DISPLAYNAME_PREFIX}.ProgressBar`;

    public render() {
        const { animate = true, className, intent, progressLimits, stripes = true, value } = this.props;
        // const testValue = 80;
        // const testProgressLimits = [
        //     { color: "#1F4B99", start: 0, end: 25 },
        //     { color: "#6B9FA1", start: 25, end: 50 },
        //     { color: "#FFE39F", start: 50, end: 75 },
        //     { color: "#D78742", start: 75, end: 100 }
        // ];
        const classes = classNames(
            Classes.PROGRESS_BAR,
            Classes.intentClass(intent),
            { [Classes.PROGRESS_NO_ANIMATION]: !animate, [Classes.PROGRESS_NO_STRIPES]: !stripes },
            className,
        );
        // don't set width if value is null (rely on default CSS value)
        const width = value == null ? null : 100 * clamp(value, 0, 1) + "%";
        const style = progressLimits ? { ...calcGradient(value, progressLimits) } : {};

        return (
            <div className={classes} style={style}>
                <div className={Classes.PROGRESS_METER} style={{ width }} />
            </div>
        );
    }
}
