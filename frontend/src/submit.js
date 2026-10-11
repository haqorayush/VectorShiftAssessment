// submit.js
// Integrates frontend ReactFlow graph state with FastAPI backend for real-time DAG cycle verification.
// ---------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async () => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_BASE}/pipelines/parse`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nodes, edges }),
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();
        setAlertData(data);
      } catch (error) {
        console.error('Pipeline execution failed:', error);
        setErrorMessage(error.message || 'Failed to establish connection with backend server on port 8000.');
      } finally {
        setLoading(false);
      }
    };

    return (
        <>
            <div
              style={{
                position: 'absolute',
                bottom: '32px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <button
                  type="button"
                  className="neo-button"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ opacity: loading ? 0.75 : 1, transition: 'opacity 0.15s ease' }}
                >
                  <span>{loading ? 'ANALYZING DAG...' : 'RUN PIPELINE'}</span>
                </button>
            </div>

            {/* Executive Neo-Editorial Modal Alert for Backend Inspection Report */}
            {(alertData || errorMessage) && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(6, 8, 11, 0.85)',
                  backdropFilter: 'blur(6px)',
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '440px',
                    backgroundColor: 'var(--bg)',
                    border: '1px solid var(--rule-dk)',
                    borderRadius: '2px',
                    boxShadow: '8px 8px 0px var(--gold)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Modal Header */}
                  <div
                    style={{
                      padding: '14px 22px',
                      backgroundColor: 'var(--paper)',
                      borderBottom: '1px solid var(--rule)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--mono)',
                      fontWeight: '700',
                      fontSize: '13px',
                      letterSpacing: '0.08em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{errorMessage ? 'CONNECTION FAILED' : 'PIPELINE VERIFICATION REPORT'}</span>
                    <span style={{ fontSize: '10px', color: 'var(--ink-soft)' }}>
                      {errorMessage ? '[ ERR ]' : '[ DAG_PARSE ]'}
                    </span>
                  </div>

                  {/* Modal Body */}
                  <div style={{ padding: '24px 22px', fontFamily: 'var(--sans)', color: 'var(--ink)' }}>
                    {errorMessage ? (
                      <p style={{ color: '#E48462', fontSize: '13.5px', lineHeight: '1.6', margin: 0 }}>
                        {errorMessage}
                        <br /><br />
                        <span style={{ fontSize: '12px', color: 'var(--ink-soft)', fontFamily: 'var(--mono)' }}>
                          Please verify that the FastAPI backend daemon is running on port 8000.
                        </span>
                      </p>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                          <div
                            style={{
                              padding: '14px',
                              backgroundColor: 'var(--bg-alt)',
                              border: '1px solid var(--rule)',
                              borderRadius: '2px',
                            }}
                          >
                            <span
                              style={{
                                display: 'block',
                                fontFamily: 'var(--mono)',
                                fontSize: '11px',
                                color: 'var(--ink-soft)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                              }}
                            >
                              Total Nodes
                            </span>
                            <span
                              style={{
                                display: 'block',
                                fontFamily: 'var(--mono)',
                                fontSize: '32px',
                                fontWeight: '700',
                                color: 'var(--gold)',
                                marginTop: '6px',
                              }}
                            >
                              {alertData.num_nodes}
                            </span>
                          </div>

                          <div
                            style={{
                              padding: '14px',
                              backgroundColor: 'var(--bg-alt)',
                              border: '1px solid var(--rule)',
                              borderRadius: '2px',
                            }}
                          >
                            <span
                              style={{
                                display: 'block',
                                fontFamily: 'var(--mono)',
                                fontSize: '11px',
                                color: 'var(--ink-soft)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                              }}
                            >
                              Total Edges
                            </span>
                            <span
                              style={{
                                display: 'block',
                                fontFamily: 'var(--mono)',
                                fontSize: '32px',
                                fontWeight: '700',
                                color: 'var(--gold)',
                                marginTop: '6px',
                              }}
                            >
                              {alertData.num_edges}
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            padding: '16px',
                            backgroundColor: alertData.is_dag ? 'rgba(98, 228, 197, 0.08)' : 'rgba(228, 132, 98, 0.08)',
                            border: `1px solid ${alertData.is_dag ? '#62E4C5' : '#E48462'}`,
                            borderRadius: '2px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <span
                              style={{
                                fontFamily: 'var(--mono)',
                                fontSize: '11px',
                                color: 'var(--ink-soft)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                display: 'block',
                              }}
                            >
                              Directed Acyclic Graph (DAG)
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--sans)',
                                fontSize: '15px',
                                fontWeight: '600',
                                color: alertData.is_dag ? '#62E4C5' : '#E48462',
                                marginTop: '4px',
                                display: 'block',
                              }}
                            >
                              {alertData.is_dag ? 'Valid (Acyclic Pipeline)' : 'Invalid (Cycle Detected)'}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: 'var(--mono)',
                              fontSize: '18px',
                              fontWeight: '700',
                              color: alertData.is_dag ? '#62E4C5' : '#E48462',
                            }}
                          >
                            {alertData.is_dag ? 'PASS' : 'FAIL'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div
                    style={{
                      padding: '14px 22px',
                      borderTop: '1px solid var(--rule)',
                      backgroundColor: 'var(--paper)',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <button
                      type="button"
                      className="neo-button"
                      style={{ padding: '8px 18px', fontSize: '12px' }}
                      onClick={() => {
                        setAlertData(null);
                        setErrorMessage(null);
                      }}
                    >
                      <span>CLOSE REPORT</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
        </>
    );
};
