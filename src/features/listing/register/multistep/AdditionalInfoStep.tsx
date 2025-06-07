import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { ShedRegisterCommonProps } from './types'

const AdditionalInfoStep = (
  {
    // setFormData,
    // formData
  }: ShedRegisterCommonProps,
) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Additional Info</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="waterAvailability" className="cursor-pointer">
            Water Availability
          </Label>
          <Switch
            id="waterAvailability"
            // checked={waterAvailability}
            // onCheckedChange={(checked) =>
            //   handleSwitchChange('waterAvailability', checked)
            // }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="roadPavement" className="cursor-pointer">
            Road/Pavement
          </Label>
          <Switch
            id="roadPavement"
            // checked={roadPavement}
            // onCheckedChange={(checked) =>
            //   handleSwitchChange('roadPavement', checked)
            // }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="parking" className="cursor-pointer">
            Parking
          </Label>
          <Switch
            id="parking"
            // checked={parking}
            // onCheckedChange={(checked) =>
            //   handleSwitchChange('parking', checked)
            // }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="security" className="cursor-pointer">
            Security
          </Label>
          <Switch
            id="security"
            // checked={security}
            // onCheckedChange={(checked) =>
            //   handleSwitchChange('security', checked)
            // }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="powerBackup" className="cursor-pointer">
            Power Backup
          </Label>
          <Switch
            id="powerBackup"
            // checked={powerBackup}
            // onCheckedChange={(checked) =>
            //   handleSwitchChange('powerBackup', checked)
            // }
          />
        </div>
      </div>
    </div>
  )
}

export default AdditionalInfoStep
