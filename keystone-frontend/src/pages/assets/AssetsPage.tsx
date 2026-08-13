import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';

import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';

import { assetService } from '../../services/assetService';
import { siteService } from '../../services/siteService';

import type {
  Asset,
  CreateAssetRequest,
  Site,
  UpdateAssetRequest,
} from '../../types';

const empty: CreateAssetRequest = {
  siteId: '',
  assetCode: '',
  assetName: '',
  assetType: '',
  manufacturer: '',
  model: '',
  serialNumber: '',
  installationDate: '',
  warrantyExpiry: '',
};

/**
 * Converts a backend date value into the format required by
 * an HTML date input: YYYY-MM-DD.
 *
 * Handles values such as:
 * 2026-08-24
 * 2026-08-24T00:00:00
 * 24-08-2026
 */
const normalizeDate = (value?: string): string => {
  if (!value) {
    return '';
  }

  // Already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // ISO datetime format
  if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return value.substring(0, 10);
  }

  // Convert DD-MM-YYYY to YYYY-MM-DD
  const match = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);

  if (match) {
    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  }

  return value;
};

export const AssetsPage = () => {
  const [rows, setRows] = useState<Asset[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Asset | null>(null);

  const [form, setForm] = useState<CreateAssetRequest>(empty);

  /**
   * Load assets and sites from the backend.
   */
  const load = async () => {
    setLoading(true);
    setError('');

    try {
      const [assetsResponse, sitesResponse] = await Promise.all([
        assetService.list(),
        siteService.list(),
      ]);

      setRows(assetsResponse.data);
      setSites(sitesResponse.data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Unable to load assets.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  /**
   * Open the dialog for creating a new asset.
   */
  const create = () => {
    setEditing(null);
    setForm({
      ...empty,
    });
    setError('');
    setOpen(true);
  };

  /**
   * Open the dialog for editing an existing asset.
   */
  const edit = (r: Asset) => {
    setEditing(r);

    setForm({
      siteId: r.siteId,
      assetCode: r.assetCode,
      assetName: r.assetName,
      assetType: r.assetType,
      manufacturer: r.manufacturer ?? '',
      model: r.model ?? '',
      serialNumber: r.serialNumber ?? '',
      installationDate: normalizeDate(r.installationDate),
      warrantyExpiry: normalizeDate(r.warrantyExpiry),
    });

    setError('');
    setOpen(true);
  };

  /**
   * Create or update an asset.
   */
  const save = async () => {
    setError('');

    try {
      if (editing) {
        const data: UpdateAssetRequest = {
          assetName: form.assetName,
          assetType: form.assetType,
          manufacturer: form.manufacturer,
          model: form.model,
          serialNumber: form.serialNumber,
          installationDate: form.installationDate,
          warrantyExpiry: form.warrantyExpiry,
          active: editing.active,
        };

        await assetService.update(editing.id, data);
      } else {
        await assetService.create(form);
      }

      setOpen(false);
      await load();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Unable to save asset.'
      );
    }
  };

  /**
   * Delete an asset.
   */
  const remove = async (id: string) => {
    if (!window.confirm('Delete this asset?')) {
      return;
    }

    try {
      await assetService.remove(id);
      await load();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Unable to delete asset.'
      );
    }
  };

  return (
    <Box>
      <PageHeader
        title="Assets"
        subtitle="Manage equipment installed at KEYSTONE sites"
        action={
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            onClick={create}
          >
            Add asset
          </Button>
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <DataTable
            rows={rows}
            loading={loading}
            emptyMessage="No assets found"
            columns={[
              {
                key: 'assetCode',
                label: 'Code',
              },
              {
                key: 'assetName',
                label: 'Asset',
              },
              {
                key: 'assetType',
                label: 'Type',
              },
              {
                key: 'siteId',
                label: 'Site',
                render: (r) =>
                  sites.find((s) => s.id === r.siteId)?.siteName ??
                  r.siteId,
              },
              {
                key: 'serialNumber',
                label: 'Serial number',
              },
              {
                key: 'active',
                label: 'Status',
                render: (r) => (
                  <StatusBadge
                    label={r.active ? 'Active' : 'Inactive'}
                    color={r.active ? 'success' : 'default'}
                  />
                ),
              },
              {
                key: 'id',
                label: 'Actions',
                render: (r) => (
                  <Stack direction="row">
                    <IconButton onClick={() => edit(r)}>
                      <FiEdit2 />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => void remove(r.id)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Stack>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Add / Edit Asset Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editing ? 'Edit asset' : 'Add asset'}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            {/* Site */}
            <Grid item xs={12}>
              <TextField
                select
                label="Site"
                value={form.siteId}
                disabled={!!editing}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    siteId: e.target.value,
                  }))
                }
                fullWidth
                required
              >
                {sites.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.siteName} ({s.siteCode})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Asset Code */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Asset Code"
                value={form.assetCode}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    assetCode: e.target.value,
                  }))
                }
                fullWidth
                required
              />
            </Grid>

            {/* Asset Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Asset Name"
                value={form.assetName}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    assetName: e.target.value,
                  }))
                }
                fullWidth
                required
              />
            </Grid>

            {/* Asset Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Asset Type"
                value={form.assetType}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    assetType: e.target.value,
                  }))
                }
                fullWidth
                required
              />
            </Grid>

            {/* Manufacturer */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Manufacturer"
                value={form.manufacturer ?? ''}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    manufacturer: e.target.value,
                  }))
                }
                fullWidth
              />
            </Grid>

            {/* Model */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Model"
                value={form.model ?? ''}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    model: e.target.value,
                  }))
                }
                fullWidth
              />
            </Grid>

            {/* Serial Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Serial Number"
                value={form.serialNumber ?? ''}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    serialNumber: e.target.value,
                  }))
                }
                fullWidth
              />
            </Grid>

            {/* Installation Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Installation Date"
                type="date"
                value={normalizeDate(form.installationDate)}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    installationDate: e.target.value,
                  }))
                }
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="Select a date — format: YYYY-MM-DD"
              />
            </Grid>

            {/* Warranty Expiry */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Warranty Expiry"
                type="date"
                value={normalizeDate(form.warrantyExpiry)}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    warrantyExpiry: e.target.value,
                  }))
                }
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                helperText="Select a date — format: YYYY-MM-DD"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={() => void save()}
          >
            {editing ? 'Save changes' : 'Create asset'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};