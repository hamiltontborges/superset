/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import getFormDataWithExtraFilters, {
  CachedFormDataWithExtraControls,
  GetFormDataWithExtraFiltersArguments,
} from 'src/dashboard/util/charts/getFormDataWithExtraFilters';
import { sliceId as chartId } from 'spec/fixtures/mockChartQueries';

describe('getFormDataWithExtraFilters', () => {
  const filterId = 'native-filter-1';
  const mockChart = {
    id: chartId,
    chartAlert: null,
    chartStatus: null,
    chartUpdateEndTime: null,
    chartUpdateStartTime: 1,
    lastRendered: 1,
    latestQueryFormData: {},
    sliceFormData: null,
    queryController: null,
    queriesResponse: null,
    triggerQuery: false,
    form_data: {
      viz_type: 'filter_select',
      filters: [
        {
          col: 'country_name',
          op: 'IN',
          val: ['United States'],
        },
      ],
      datasource: '123',
      url_params: {},
    },
  };
  const mockArgs: GetFormDataWithExtraFiltersArguments = {
    chartConfiguration: {},
    chart: mockChart,
    filters: {
      region: ['Spain'],
      color: ['pink', 'purple'],
    },
    sliceId: chartId,
    nativeFilters: {},
    dataMask: {
      [filterId]: {
        id: filterId,
        extraFormData: {},
        filterState: {},
        ownState: {},
      },
    },
    extraControls: {
      stack: 'Stacked',
    },
    allSliceIds: [chartId],
  };

  it('should include filters from the passed filters', () => {
    const result = getFormDataWithExtraFilters(mockArgs);
    expect(result.extra_filters).toHaveLength(2);
    expect(result.extra_filters[0]).toEqual({
      col: 'region',
      op: 'IN',
      val: ['Spain'],
    });
    expect(result.extra_filters[1]).toEqual({
      col: 'color',
      op: 'IN',
      val: ['pink', 'purple'],
    });
  });

  it('should compose extra control', () => {
    const result: CachedFormDataWithExtraControls =
      getFormDataWithExtraFilters(mockArgs);
    expect(result.stack).toEqual('Stacked');
  });
});
